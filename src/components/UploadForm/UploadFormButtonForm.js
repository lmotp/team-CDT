import React from 'react';

// imports for summernote
import ReactSummernote from 'react-summernote';
import 'react-summernote/dist/react-summernote.css';
import 'react-summernote/lang/summernote-ko-KR';
import 'bootstrap/js/modal';
import 'bootstrap/js/dropdown';
import 'bootstrap/js/tooltip';
import 'bootstrap/dist/css/bootstrap.css';

const UploadFormButtonForm = () => {
  const onImageUpload = (images, insertImage) => {
    for (let i = 0; i < images.length; i++) {
      const reader = new FileReader();

      reader.onloadend = () => {
        insertImage(reader.result);
      };

      reader.readAsDataURL(images[i]);
    }
  };

  return (
    <div>
      <ReactSummernote
        value="내용을 입력하여주세요"
        options={{
          lang: 'ko-KR',
          height: 400,
          dialogsInBody: true,
          placeholder: `명예 훼손, 허위 정보, 비정상 플레이 유포 등 법률, 약관, 운영정책을 위반하는 게시글 등록 시 이용이 제한될 수 있습니다. 
            <br />게시글 작성 시 소중한 개인정보를 포함하지 않도록 주의 부탁 드립니다.`,
          fontSizes: ['8', '9', '10', '11', '12', '14', '18'],
          toolbar: [
            ['style', ['bold', 'italic', 'underline', 'clear']],
            ['font', ['strikethrough']],
            ['fontname', ['fontname']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture', 'video']],
            ['view', ['fullscreen', 'codeview']],
          ],
          disableResizeEditor: true,
        }}
        onImageUpload={onImageUpload}
      />
    </div>
  );
};

export default UploadFormButtonForm;
