import { Icon, Modal, Upload } from 'antd';
import { UploadFile } from 'antd/lib/upload/interface';
import * as React from 'react';
import { removeImage, uploadImage } from '../services/image-service';

const UploadButton: React.FC = ({ children }) => (
  <div>
    <Icon type="plus" />
    <div>{children}</div>
  </div>
);

interface IImageUploadProps {
  max?: number;
  onFileChange: (filePaths: string[]) => void;
  uploadBtnText?: string;
}

export const ImageUpload: React.FC<IImageUploadProps> = ({
  onFileChange,
  max,
  uploadBtnText = 'Upload'
}) => {
  const [fileList, setFileList] = React.useState<UploadFile[]>([]);
  const [filePaths, setFilePaths] = React.useState<string[]>([]);
  const [previewImgSrc, setPreviewImgSrc] = React.useState<string | undefined>();

  const addFilePath = (filePath: string) =>
    setFilePaths(prevFilePaths => prevFilePaths.concat(filePath));

  React.useEffect(() => {
    onFileChange(filePaths);
  }, [filePaths]);

  return (
    <div className="clearfix">
      <Upload
        action={file => uploadImage(file.name, file as any).then(addFilePath)}
        listType="picture-card"
        onChange={({ fileList }) => setFileList(fileList)}
        onPreview={file => setPreviewImgSrc(file.url || file.thumbUrl)}
        onRemove={file => removeImage(file.name) as any}
        accept="image/*"
      >
        {max && fileList.length >= max ? null : <UploadButton>{uploadBtnText}</UploadButton>}
      </Upload>
      <Modal visible={!!previewImgSrc} footer={null} onCancel={() => setPreviewImgSrc(undefined)}>
        <img alt="preview upload" src={previewImgSrc} style={{ width: '100%' }} />
      </Modal>
    </div>
  );
};
