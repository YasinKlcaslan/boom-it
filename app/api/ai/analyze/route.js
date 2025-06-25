import { NextRequest, NextResponse } from 'next/server';
import magikaService from '@/lib/magika';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('file');

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files found for analysis' },
        { status: 400 }
      );
    }

    const filesToAnalyze = [];
    for (const file of files) {
      if (file.size > 0) {
        try {
          const buffer = Buffer.from(await file.arrayBuffer());
          filesToAnalyze.push({
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
            buffer: buffer
          });
        } catch (error) {
          console.error(`File reading error ${file.name}:`, error);
          filesToAnalyze.push({
            name: file.name,
            size: file.size,
            lastModified: file.lastModified,
            buffer: null,
            error: 'File could not be read'
          });
        }
      }
    }

    if (filesToAnalyze.length === 0) {
      return NextResponse.json(
        { error: 'No valid files found' },
        { status: 400 }
      );
    }

    const analysisResults = await magikaService.identifyMultipleFiles(
      filesToAnalyze.filter(f => f.buffer !== null)
    );
    
    const errorFiles = filesToAnalyze.filter(f => f.buffer === null).map(f => ({
      fileName: f.name,
      fileSize: f.size,
      error: f.error || 'File could not be processed',
      analysisTimestamp: new Date().toISOString(),
      detectedType: 'unknown',
      confidence: 0,
      isExecutable: false,
      isSafe: true,
      description: 'Error',
      riskLevel: 'high'
    }));

    // Add risk level to each analysis result
    const analysisWithRisk = analysisResults.map(result => ({
      ...result,
      riskLevel: result.isExecutable ? 'high' : 
                result.isSafe === false ? 'high' :
                result.confidence < 0.5 ? 'medium' : 'low'
    }));

    const allResults = [...analysisWithRisk, ...errorFiles];
    
    const securityReport = magikaService.generateSecurityReport(allResults);

    return NextResponse.json({
      success: true,
      message: 'File analysis completed',
      analysis: {
        files: allResults,
        security: securityReport,
        processedAt: new Date().toISOString(),
        processingTime: `${allResults.length} files analyzed`
      }
    });

  } catch (error) {
    console.error('AI analysis error:', error);
    return NextResponse.json(
      { 
        error: 'Error occurred during file analysis',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const isReady = magikaService.isInitialized;
    
    return NextResponse.json({
      service: 'Magika AI File Analysis',
      status: isReady ? 'ready' : 'initializing',
      description: 'File type and security analysis using Google Magika AI',
      version: '1.0.0',
      endpoints: {
        analyze: 'POST /api/ai/analyze - Performs file analysis',
        healthCheck: 'GET /api/ai/analyze - Checks service status'
      },
      features: [
        'File type detection',
        'Security analysis', 
        'Multiple file analysis',
        'Risk assessment',
        'Detailed reporting',
        'Executable file detection'
      ],
      supportedFormats: [
        'Documents: PDF, DOCX, XLSX, PPTX',
        'Images: JPG, PNG, GIF, WebP, BMP',
        'Videos: MP4, AVI, MOV, WMV',
        'Audio: MP3, WAV, OGG, FLAC',
        'Archives: ZIP, RAR, 7Z, TAR',
        'Code: JS, HTML, CSS, JSON, XML'
      ]
    });
  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Service status could not be checked',
        details: error.message 
      },
      { status: 500 }
    );
  }
}
