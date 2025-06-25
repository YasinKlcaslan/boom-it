class MagikaService {
  constructor() {
    this.isInitialized = true;
  }

  async initialize() {
    return true;
  }

  async identifyFile(fileBuffer, fileName = '') {
    try {
      const fileExtension = this.getFileExtension(fileName);
      const magicBytes = this.detectMagicBytes(fileBuffer);
      
      const detectedType = magicBytes || fileExtension || 'unknown';
      const confidence = magicBytes ? 0.9 : (fileExtension ? 0.7 : 0.1);
      
      return {
        detectedType: detectedType,
        confidence: confidence,
        mimeType: this.getMimeTypeFromLabel(detectedType),
        description: this.getFileTypeDescription(detectedType),
        isExecutable: this.isExecutableFile(detectedType),
        isSafe: this.isSafeFileType(detectedType),
        fileName: fileName,
        fileSize: fileBuffer.length,
        analysisTimestamp: new Date().toISOString(),
        analysisMethod: 'File Extension + Magic Bytes'
      };
    } catch (error) {
      console.error('Error during file analysis:', error);
      return {
        fileName: fileName,
        fileSize: fileBuffer.length,
        error: error.message,
        analysisTimestamp: new Date().toISOString(),
        detectedType: 'unknown',
        confidence: 0,
        isExecutable: false,
        isSafe: true,
        description: 'Could not be analyzed'
      };
    }
  }

  getFileExtension(fileName) {
    if (!fileName) return null;
    const parts = fileName.split('.');
    if (parts.length < 2) return null;
    return parts[parts.length - 1].toLowerCase();
  }

  detectMagicBytes(buffer) {
    if (!buffer || buffer.length < 4) return null;
    
    const firstBytes = Array.from(buffer.slice(0, 10));
    const hex = firstBytes.map(b => b.toString(16).padStart(2, '0')).join('');
    
    const signatures = {
      '25504446': 'pdf',
      '504b0304': 'zip',
      '504b0506': 'zip',
      '504b0708': 'zip',
      '52617221': 'rar',
      '377abcaf': '7z',
      '89504e47': 'png',
      'ffd8ffe0': 'jpg',
      'ffd8ffe1': 'jpg',
      'ffd8ffe2': 'jpg',
      '47494638': 'gif',
      '424d': 'bmp',
      '49492a00': 'tiff',
      '4d4d002a': 'tiff',
      '52494646': 'wav',
      'fffb': 'mp3',
      'fff3': 'mp3',
      'fff2': 'mp3',
      'id3': 'mp3',
      '4f676753': 'ogg',
      '664c6143': 'flac',
      '00000020': 'mp4',
      '00000018': 'mp4',
      '00000014': 'mp4',
      '66747970': 'mp4',
      '4d546864': 'midi',
      'cafebabe': 'class',
      '4d5a': 'exe',
      '7f454c46': 'elf',
      'feedface': 'macho',
      'feedfacf': 'macho',
      'cefaedfe': 'macho',
      'cffaedfe': 'macho',
      '213c617263683e': 'deb',
      'edabeedb': 'rpm',
      '1f8b08': 'gz',
      '425a68': 'bz2',
      '1f9d': 'tar.z',
      '1fa0': 'tar.z',
      '75737461': 'tar',
      '213c68746d6c': 'html',
      '3c68746d6c': 'html',
      '3c48544d4c': 'html',
      '3c215b43': 'html',
      '3c21444f': 'html',
      '7b5c727466': 'rtf',
      '3c3f786d6c': 'xml',
      '7b': 'json',
      '5b': 'json',
    };

    for (const [signature, type] of Object.entries(signatures)) {
      if (hex.startsWith(signature)) {
        return type;
      }
    }

    if (this.isTextFile(buffer)) {
      return 'txt';
    }

    return null;
  }

  isTextFile(buffer) {
    if (!buffer || buffer.length === 0) return false;
    
    const sample = buffer.slice(0, Math.min(1000, buffer.length));
    let textBytes = 0;
    
    for (let i = 0; i < sample.length; i++) {
      const byte = sample[i];
      if ((byte >= 32 && byte <= 126) || byte === 9 || byte === 10 || byte === 13) {
        textBytes++;
      } else if (byte === 0) {
        return false;
      }
    }
    
    return (textBytes / sample.length) > 0.8;
  }

  async identifyMultipleFiles(files) {
    const results = [];
    
    for (const file of files) {
      const analysis = await this.identifyFile(file.buffer, file.name);
      results.push({
        ...analysis,
        originalFile: {
          name: file.name,
          size: file.size,
          lastModified: file.lastModified
        }
      });
    }
    
    return results;
  }

  getMimeTypeFromLabel(label) {
    const mimeMap = {
      'pdf': 'application/pdf',
      'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'doc': 'application/msword',
      'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'xls': 'application/vnd.ms-excel',
      'pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'ppt': 'application/vnd.ms-powerpoint',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'gif': 'image/gif',
      'webp': 'image/webp',
      'bmp': 'image/bmp',
      'tiff': 'image/tiff',
      'svg': 'image/svg+xml',
      'mp4': 'video/mp4',
      'avi': 'video/x-msvideo',
      'mov': 'video/quicktime',
      'wmv': 'video/x-ms-wmv',
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      'flac': 'audio/flac',
      'txt': 'text/plain',
      'html': 'text/html',
      'css': 'text/css',
      'js': 'application/javascript',
      'json': 'application/json',
      'xml': 'application/xml',
      'csv': 'text/csv',
      'rtf': 'application/rtf',
      'zip': 'application/zip',
      'rar': 'application/x-rar-compressed',
      '7z': 'application/x-7z-compressed',
      'tar': 'application/x-tar',
      'gz': 'application/gzip',
      'bz2': 'application/x-bzip2',
      'exe': 'application/x-msdownload',
      'msi': 'application/x-msi',
      'deb': 'application/x-deb',
      'rpm': 'application/x-rpm',
      'dmg': 'application/x-apple-diskimage',
      'class': 'application/java-vm'
    };
    return mimeMap[label?.toLowerCase()] || 'application/octet-stream';
  }

  getFileTypeDescription(label) {
    const descriptions = {
      'pdf': 'Adobe PDF Document',
      'docx': 'Microsoft Word Document',
      'doc': 'Microsoft Word 97-2003 Document',
      'xlsx': 'Microsoft Excel Spreadsheet',
      'xls': 'Microsoft Excel 97-2003 Spreadsheet',
      'pptx': 'Microsoft PowerPoint Presentation',
      'ppt': 'Microsoft PowerPoint 97-2003 Presentation',
      'jpg': 'JPEG Image File',
      'jpeg': 'JPEG Image File',
      'png': 'PNG Image File',
      'gif': 'GIF Animated Image',
      'webp': 'WebP Image File',
      'bmp': 'Bitmap Image File',
      'tiff': 'TIFF Image File',
      'svg': 'SVG Vector Image',
      'mp4': 'MP4 Video File',
      'avi': 'AVI Video File',
      'mov': 'QuickTime Video File',
      'wmv': 'Windows Media Video',
      'flv': 'Flash Video File',
      'mkv': 'Matroska Video File',
      'mp3': 'MP3 Audio File',
      'wav': 'WAV Audio File',
      'ogg': 'OGG Audio File',
      'flac': 'FLAC Lossless Audio File',
      'aac': 'AAC Audio File',
      'm4a': 'M4A Audio File',
      'txt': 'Plain Text File',
      'rtf': 'Rich Text File',
      'html': 'HTML Web Page',
      'css': 'CSS Style File',
      'js': 'JavaScript File',
      'ts': 'TypeScript File',
      'json': 'JSON Data File',
      'xml': 'XML File',
      'csv': 'CSV Data File',
      'zip': 'ZIP Archive File',
      'rar': 'RAR Archive File',
      '7z': '7-Zip Archive File',
      'tar': 'TAR Archive File',
      'gz': 'GZIP Compressed File',
      'bz2': 'BZIP2 Compressed File',
      'exe': 'Windows Executable File',
      'msi': 'Windows Installer Package',
      'dmg': 'macOS Disk Image',
      'app': 'macOS Application',
      'deb': 'Debian Package',
      'rpm': 'RPM Package',
      'apk': 'Android Application Package',
      'ipa': 'iOS Application Archive',
      'class': 'Java Class File',
      'jar': 'Java JAR Archive',
      'elf': 'Linux Executable File',
      'macho': 'macOS Executable File'
    };
    return descriptions[label?.toLowerCase()] || `${(label || 'Unknown').toUpperCase()} File`;
  }

  isExecutableFile(label) {
    const executableTypes = [
      'exe', 'msi', 'bat', 'cmd', 'com', 'scr', 'pif', 'app', 'dmg', 
      'pkg', 'deb', 'rpm', 'sh', 'run', 'bin', 'elf', 'apk', 'ipa',
      'jar', 'war', 'ear', 'class', 'macho'
    ];
    return executableTypes.includes(label?.toLowerCase());
  }

  isSafeFileType(label) {
    const safeTypes = [
      'pdf', 'docx', 'xlsx', 'pptx', 'doc', 'xls', 'ppt', 'txt', 'rtf', 
      'odt', 'ods', 'odp', 'csv',
      'jpg', 'jpeg', 'png', 'gif', 'bmp', 'tiff', 'webp', 'svg',
      'mp3', 'wav', 'ogg', 'flac', 'aac', 'm4a',
      'mp4', 'avi', 'mkv', 'mov', 'wmv', 'flv', 'webm',
      'zip', 'rar', '7z', 'tar', 'gz', 'bz2',
      'html', 'css', 'js', 'json', 'xml'
    ];
    return safeTypes.includes(label?.toLowerCase());
  }

  generateSecurityReport(analyses) {
    const totalFiles = analyses.length;
    const safeFiles = analyses.filter(a => a.isSafe !== false && !a.error).length;
    const executableFiles = analyses.filter(a => a.isExecutable === true).length;
    const unknownFiles = analyses.filter(a => a.error || a.detectedType === 'unknown').length;
    
    const riskyFiles = analyses.filter(a => 
      a.isExecutable === true || 
      a.isSafe === false || 
      (a.confidence && a.confidence < 0.5) ||
      a.error
    );

    return {
      summary: {
        totalFiles,
        safeFiles,
        executableFiles,
        unknownFiles,
        riskyFiles: riskyFiles.length,
        overallRiskLevel: this.calculateRiskLevel(riskyFiles.length, totalFiles)
      },
      riskyFiles: riskyFiles.map(file => ({
        fileName: file.fileName,
        detectedType: file.detectedType || 'unknown',
        reason: this.getRiskReason(file),
        confidence: file.confidence || 0
      })),
      recommendations: this.generateRecommendations(riskyFiles, totalFiles)
    };
  }

  calculateRiskLevel(riskyCount, totalCount) {
    if (totalCount === 0) return 'Unknown';
    const riskPercentage = (riskyCount / totalCount) * 100;
    if (riskPercentage === 0) return 'Safe';
    if (riskPercentage < 10) return 'Low Risk';
    if (riskPercentage < 30) return 'Medium Risk';
    return 'High Risk';
  }

  getRiskReason(file) {
    if (file.error) return 'File could not be analyzed';
    if (file.isExecutable) return 'Executable file';
    if (file.isSafe === false) return 'Potential security risk';
    if (file.confidence && file.confidence < 0.5) return 'Uncertain file type';
    return 'Unknown risk';
  }

  generateRecommendations(riskyFiles, totalFiles) {
    const recommendations = [];
    
    if (riskyFiles.length === 0) {
      recommendations.push('✅ All files appear to be safe.');
    } else {
      recommendations.push(`⚠️ Potential risk detected in ${riskyFiles.length} files.`);
      
      const executableCount = riskyFiles.filter(f => f.reason === 'Executable file').length;
      if (executableCount > 0) {
        recommendations.push(`🚫 ${executableCount} executable files detected. Make sure these files are safe before running them.`);
      }
      
      const uncertainCount = riskyFiles.filter(f => f.reason === 'Uncertain file type').length;
      if (uncertainCount > 0) {
        recommendations.push(`❓ ${uncertainCount} files have uncertain types. Manual review is recommended.`);
      }

      const errorCount = riskyFiles.filter(f => f.reason === 'File could not be analyzed').length;
      if (errorCount > 0) {
        recommendations.push(`🔍 ${errorCount} files could not be analyzed. These files should be checked manually.`);
      }
    }
    
    recommendations.push('💡 Scan suspicious files in a secure environment.');
    recommendations.push('🔒 Be careful with files from unknown sources.');
    
    return recommendations;
  }
}

const magikaService = new MagikaService();

export default magikaService;
