import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, X, Image as ImageIcon, Loader2, Sparkles } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000';

export default function UploadSection() {
  const [isDragging, setIsDragging] = useState(false);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFile = useCallback((file) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please upload a valid image file.');
      return;
    }
    setError(null);
    setResult(null);
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files[0]);
  }, [handleFile]);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e) => {
    handleFile(e.target.files[0]);
  }, [handleFile]);

  const handlePredict = async () => {
    if (!image) return;
    setLoading(true);
    setResult(null);
    setError(null);

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await fetch(`${API_URL}/predict`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Prediction failed');
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  const confidencePercent = result
    ? `${(parseFloat(result.confidence) * 100).toFixed(1)}%`
    : '0%';

  return (
    <section id="predict" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary-50/30 dark:via-primary-900/10 to-transparent" />
      <div className="max-w-4xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Upload & Predict</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Drag & drop an image or click to browse. Our AI will identify whether it's a cat or a dog in seconds.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-3xl p-6 sm:p-10"
        >
          {!preview ? (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              className={`relative border-2 border-dashed rounded-2xl p-12 sm:p-16 text-center cursor-pointer transition-all duration-300 ${
                isDragging
                  ? 'border-primary-500 bg-primary-50/50 dark:bg-primary-900/20 scale-[1.02]'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-400 dark:hover:border-primary-500 hover:bg-gray-50/50 dark:hover:bg-gray-800/30'
              }`}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Upload image file"
              />
              <motion.div
                animate={{ y: isDragging ? -5 : [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="mb-6"
              >
                <div className="w-20 h-20 mx-auto rounded-full gradient-bg flex items-center justify-center shadow-lg shadow-primary-500/30">
                  <Upload className="w-10 h-10 text-white" />
                </div>
              </motion.div>
              <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
                {isDragging ? 'Drop your image here' : 'Drag & drop your image'}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">or click to browse • PNG, JPG, WEBP</p>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center min-h-[250px]">
                <img
                  src={preview}
                  alt="Uploaded preview"
                  className="max-h-[400px] w-auto object-contain mx-auto"
                />
                <button
                  onClick={reset}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-colors"
                  aria-label="Remove image"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex justify-center">
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className="btn-primary flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5" />
                      Predict
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          <AnimatePresence>
            {loading && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-8 overflow-hidden"
              >
                <div className="flex flex-col items-center gap-4 py-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 rounded-full border-4 border-primary-200 dark:border-gray-700 border-t-primary-600"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                    AI is analyzing your image...
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="mt-8"
              >
                <div className="glass-card rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row items-center gap-6">
                    {preview && (
                      <img
                        src={preview}
                        alt="Uploaded"
                        className="w-32 h-32 rounded-xl object-cover shadow-md"
                      />
                    )}
                    <div className="flex-1 text-center sm:text-left">
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
                        Prediction
                      </p>
                      <p className="text-3xl font-bold mb-2">
                        {result.prediction === 'Dog' ? '🐶' : '🐱'} {result.prediction}
                      </p>
                      <div className="flex items-center gap-3 justify-center sm:justify-start">
                        <div className="flex-1 max-w-[200px] h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: confidencePercent }}
                            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
                            className="h-full gradient-bg rounded-full"
                          />
                        </div>
                        <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                          {confidencePercent}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        Confidence Score
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-center"
              >
                <p className="text-sm text-red-600 dark:text-red-400 font-medium">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
