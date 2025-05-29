import { Editor } from '@tinymce/tinymce-react';
import { Controller } from 'react-hook-form';
import conf from '../conf/conf';

interface RTEProps {
    name: string;
    control: any;
    label?: string;
    defaultValue?: string;
}

// Rich Text Editor (TinyMCE)
const RTE = ({ name, control, label, defaultValue = '' }: RTEProps) => {
    return (
        <div className="my-4">
            {label && <label className="text-sm text-gray-600 mb-2 block">{label}</label>}

            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field: { onChange, value } }) => (
                    <Editor
                        apiKey={conf.tinyApi}
                        value={value}
                        init={{
                            height: 400,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
                                'preview', 'anchor', 'searchreplace', 'visualblocks', 'code',
                                'fullscreen', 'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: `undo redo | styleselect | bold italic underline strikethrough | 
            alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |
            link image media table | code preview fullscreen | help`,
                            style_formats: [
                                { title: 'Heading 1', format: 'h1' },
                                { title: 'Heading 2', format: 'h2' },
                                { title: 'Heading 3', format: 'h3' },
                                { title: 'Blockquote', format: 'blockquote' },
                                { title: 'Code', format: 'code' }
                            ],
                            content_style: `
  body {
    font-family:Helvetica,Arial,sans-serif;
    font-size:14px;
    word-wrap: break-word;
    white-space: normal;
    max-width: 100%;
  }
`,

                        }}

                        onEditorChange={onChange}
                    />
                )}
            />
           
        </div>
    );
};

export default RTE;




