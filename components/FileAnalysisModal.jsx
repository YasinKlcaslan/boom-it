import React, { useState } from 'react';
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaFileAlt, FaTimes, FaRobot } from 'react-icons/fa';

const FileAnalysisModal = ({ isVisible, analysisData, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isVisible || !analysisData) return null;

  const { files, security } = analysisData.analysis;

  const getRiskColor = (riskLevel) => {
    switch (riskLevel) {
      case 'Safe': return 'text-green-600';
      case 'Low Risk': return 'text-yellow-600';
      case 'Medium Risk': return 'text-orange-600';
      case 'High Risk': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getFileIcon = (detectedType) => {
    const iconMap = {
      'pdf': '📄',
      'docx': '📝', 
      'doc': '📝',
      'xlsx': '📊',
      'xls': '📊',
      'pptx': '📽️',
      'ppt': '📽️',
      'jpg': '🖼️',
      'jpeg': '🖼️',
      'png': '🖼️',
      'gif': '🎞️',
      'webp': '🖼️',
      'bmp': '🖼️',
      'tiff': '🖼️',
      'svg': '🎨',
      'mp4': '🎬',
      'avi': '🎬',
      'mov': '🎬',
      'wmv': '🎬',
      'mp3': '🎵',
      'wav': '🎵',
      'ogg': '🎵',
      'flac': '🎵',
      'zip': '📦',
      'rar': '📦',
      '7z': '📦',
      'tar': '📦',
      'exe': '⚠️',
      'msi': '⚠️',
      'dmg': '💿',
      'apk': '📱',
      'ipa': '📱',
      'txt': '📄',
      'html': '🌐',
      'css': '🎨',
      'js': '⚙️',
      'json': '📋',
      'xml': '📋',
      'unknown': '❓'
    };
    return iconMap[detectedType?.toLowerCase()] || '📄';
  };

  const getRiskBadge = (file) => {
    if (file.error) {
      return <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">Hata</span>;
    }
    if (file.isExecutable) {
      return <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Çalıştırılabilir</span>;
    }
    if (file.isSafe === false) {
      return <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">Risk</span>;
    }
    if (file.confidence && file.confidence < 0.5) {
      return <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Belirsiz</span>;
    }
    if (file.isSafe === true) {
      return <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Güvenli</span>;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaRobot className="text-xl" />
                AI File Analysis
              </h2>
              <p className="text-blue-100 mt-1">
                Security Analysis with Google Magika AI
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl p-1"
            >
              <FaTimes />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'overview'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('files')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'files'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              File Details
            </button>
            <button
              onClick={() => setActiveTab('security')}
              className={`px-6 py-3 font-medium ${
                activeTab === 'security'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Security Report
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[60vh] overflow-y-auto">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Risk Summary */}
              <div className="bg-gray-50 rounded-xl p-4">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaShieldAlt className="text-blue-500" />
                  Analysis Summary
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {security.summary.totalFiles}
                    </div>
                    <div className="text-sm text-gray-600">Total Files</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {security.summary.safeFiles}
                    </div>
                    <div className="text-sm text-gray-600">Safe</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">
                      {security.summary.riskyFiles}
                    </div>
                    <div className="text-sm text-gray-600">Risky</div>
                  </div>
                  <div className="text-center">
                    <div className={`text-2xl font-bold ${getRiskColor(security.summary.overallRiskLevel)}`}>
                      {security.summary.overallRiskLevel}
                    </div>
                    <div className="text-sm text-gray-600">Risk Level</div>
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">⚠️</span>
                    <div>
                      <div className="font-semibold text-gray-900">{security.summary.executableFiles}</div>
                      <div className="text-sm text-gray-600">Executable Files</div>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">❓</span>
                    <div>
                      <div className="font-semibold text-gray-900">{security.summary.unknownFiles}</div>
                      <div className="text-sm text-gray-600">Unknown/Error</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" />
                  Öneriler
                </h3>
                <div className="space-y-2">
                  {security.recommendations.map((rec, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-3">
                      <p className="text-gray-800">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'files' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FaFileAlt className="text-blue-500" />
                File Analysis Results ({files.length} files)
              </h3>
              <div className="space-y-3">
                {files.map((file, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getFileIcon(file.detectedType)}</span>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{file.fileName}</h4>
                          <p className="text-sm text-gray-600">{file.description}</p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>{(file.fileSize / 1024).toFixed(1)} KB</span>
                            {file.confidence !== undefined && (
                              <span>Confidence: {(file.confidence * 100).toFixed(1)}%</span>
                            )}
                            <span>Type: {file.detectedType || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getRiskBadge(file)}
                      </div>
                    </div>
                    {file.error && (
                      <div className="mt-3 text-sm text-red-600 bg-red-50 p-2 rounded">
                        <strong>Hata:</strong> {file.error}
                      </div>
                    )}
                    {file.rawPrediction && (
                      <div className="mt-2 text-xs text-gray-400">
                        AI Model Çıktısı: {JSON.stringify(file.rawPrediction).substring(0, 100)}...
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="space-y-6">
              <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <FaExclamationTriangle className="text-orange-500" />
                Security Details
              </h3>
              
              {security.riskyFiles.length > 0 ? (
                <div>
                  <h4 className="font-medium text-red-700 mb-3">
                    Risky Files ({security.riskyFiles.length} files):
                  </h4>
                  <div className="space-y-3">
                    {security.riskyFiles.map((file, index) => (
                      <div key={index} className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div className="flex items-start gap-3">
                            <span className="text-xl">{getFileIcon(file.detectedType)}</span>
                            <div>
                              <h5 className="font-medium text-gray-900">{file.fileName}</h5>
                              <p className="text-sm text-gray-600">Type: {file.detectedType}</p>
                              <p className="text-sm text-red-600 font-medium">Risk: {file.reason}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-500">
                              Confidence: {(file.confidence * 100).toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <FaCheckCircle className="text-green-500 text-3xl mx-auto mb-2" />
                  <h4 className="font-medium text-green-800 mb-1">Security Check Successful</h4>
                  <p className="text-green-600">No security risks detected.</p>
                </div>
              )}

              {/* Technical Details */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Technical Details:</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>• Analysis Time: {new Date(analysisData.analysis.processedAt).toLocaleString('en-US')}</p>
                  <p>• AI Model: Google Magika</p>
                  <p>• Processed Files: {security.summary.totalFiles}</p>
                  <p>• Executable Files: {security.summary.executableFiles}</p>
                  <p>• Unknown/Error: {security.summary.unknownFiles}</p>
                  <p>• Overall Risk Level: {security.summary.overallRiskLevel}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 px-6 py-4 bg-gray-50">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Powered by Google Magika AI
            </div>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileAnalysisModal;
