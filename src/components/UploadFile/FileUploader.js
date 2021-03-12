import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'filepond/dist/filepond.min.css'
import { FilePond, File, registerPlugin } from 'react-filepond'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileRename from 'filepond-plugin-file-rename'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import FilePondPluginImageTransform from 'filepond-plugin-image-transform'
import FilePondPluginImageResize from 'filepond-plugin-image-resize'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFileRename,
  FilePondPluginImagePreview,
  FilePondPluginImageTransform,
  FilePondPluginImageResize,
  FilePondPluginImageExifOrientation
)

const FileUploader = ({ onUploadComplete, acceptedFileTypes, maxFileSize, token }) => {

  const [files, setFiles] = useState([])

  return (
    <div className='wrapper'>
      <FilePond
        files={files}
        onupdatefiles={setFiles}
        allowMultiple
        instantUpload={false}
        server={{
          process: {
            url: '/api/file/uploadOne',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
            ondata: (formData) => {
              formData.append('extraField', 'something nice')
              return formData
            },
            onload: (response) => {
              console.log('response:', response.substr(1, response.length - 2))
            },
          },
          revert: {
            url: '/api/file/remove',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        }}
        name='files'
        dropOnPage
        dropValidation
        maxFileSize={`${maxFileSize}MB`}
        acceptedFileTypes={acceptedFileTypes}
        // fileRenameFunction={ (file) => {
        //   return `my_new_name${file.extension}`;
        //}}
        fileRenameFunction={file => new Promise(resolve => {
          resolve(window.prompt('Enter new filename', file.name))
        })}
        credits={false}
      />
    </div>
  )
}

FileUploader.propTypes = {
  onUploadComplete: PropTypes.func.isRequired,
  acceptedFileTypes: PropTypes.array.isRequired,
  maxFileSize: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
}

export default FileUploader
