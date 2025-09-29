import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  X, 
  FileImage, 
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  isLoading?: boolean;
  disabled?: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ 
  onFileUpload, 
  isLoading = false, 
  disabled = false 
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    // Handle rejected files
    if (rejectedFiles.length > 0) {
      const rejection = rejectedFiles[0];
      let errorMessage = "File upload failed";
      
      if (rejection.errors[0]?.code === "file-too-large") {
        errorMessage = "File size must be less than 10MB";
      } else if (rejection.errors[0]?.code === "file-invalid-type") {
        errorMessage = "Please upload a valid image file (PNG, JPG, JPEG, DICOM)";
      }
      
      toast({
        title: "Upload Error",
        description: errorMessage,
        variant: "destructive",
      });
      return;
    }

    // Handle accepted files
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      
      // Create preview for image files
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreview(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreview(null);
      }

      // Call the parent component's upload handler
      onFileUpload(file);
      
      toast({
        title: "File uploaded successfully",
        description: `${file.name} is ready for analysis`,
      });
    }
  }, [onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg'],
      'application/dicom': ['.dcm', '.dicom'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
    disabled: disabled || isLoading,
  });

  const removeFile = () => {
    setUploadedFile(null);
    setPreview(null);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      {/* Upload Area */}
      <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div
            {...getRootProps()}
            className={`
              cursor-pointer text-center py-8 px-4 rounded-lg transition-all duration-300
              ${isDragActive 
                ? 'bg-primary/5 border-primary scale-[1.02]' 
                : 'hover:bg-secondary/50'
              }
              ${disabled || isLoading ? 'cursor-not-allowed opacity-50' : ''}
            `}
          >
            <input {...getInputProps()} />
            
            <div className="flex flex-col items-center space-y-4">
              <div className={`
                p-4 rounded-full transition-all duration-300
                ${isDragActive 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-secondary text-muted-foreground'
                }
              `}>
                {isLoading ? (
                  <Loader2 className="h-8 w-8 animate-spin" />
                ) : (
                  <Upload className="h-8 w-8" />
                )}
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">
                  {isDragActive ? 'Drop your X-ray image here' : 'Upload Chest X-Ray Image'}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  Drag & drop or click to select a file
                </p>
                
                <div className="flex flex-wrap justify-center gap-2 text-sm text-muted-foreground">
                  <Badge variant="outline">PNG</Badge>
                  <Badge variant="outline">JPG</Badge>
                  <Badge variant="outline">JPEG</Badge>
                  <Badge variant="outline">DICOM</Badge>
                </div>
                
                <p className="text-xs text-muted-foreground mt-2">
                  Maximum file size: 10MB
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* File Preview */}
      {uploadedFile && (
        <Card className="animate-slide-up">
          <CardContent className="p-4">
            <div className="flex items-start space-x-4">
              {/* Preview Image or Icon */}
              <div className="flex-shrink-0">
                {preview ? (
                  <img 
                    src={preview} 
                    alt="Upload preview" 
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                ) : (
                  <div className="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center">
                    <FileImage className="h-8 w-8 text-muted-foreground" />
                  </div>
                )}
              </div>

              {/* File Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-foreground truncate">
                    {uploadedFile.name}
                  </h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeFile}
                    disabled={isLoading}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <p className="text-sm text-muted-foreground mt-1">
                  {formatFileSize(uploadedFile.size)} • {uploadedFile.type || 'Unknown type'}
                </p>

                {/* Status */}
                <div className="flex items-center mt-2">
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />
                      <span className="text-sm text-primary">Processing...</span>
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-4 w-4 text-success mr-2" />
                      <span className="text-sm text-success">Ready for analysis</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Instructions */}
      <Card className="bg-primary-light border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <h4 className="font-medium text-primary mb-1">Upload Guidelines</h4>
              <ul className="text-muted-foreground space-y-1">
                <li>• Upload high-quality chest X-ray images for best results</li>
                <li>• Supported formats: PNG, JPG, JPEG, DICOM</li>
                <li>• Images should be clear and properly oriented</li>
                <li>• Maximum file size: 10MB</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FileUpload;