import React, { useState } from 'react'
import PropTypes from 'prop-types'
import 'filepond/dist/filepond.min.css'
import { FilePond, registerPlugin } from 'react-filepond'
import toast from 'react-hot-toast'

import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size'
import FilePondPluginFileValidateType from 'filepond-plugin-file-validate-type'
import FilePondPluginFileRename from 'filepond-plugin-file-rename'

registerPlugin(
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
  FilePondPluginFileRename,
)

const ProductFileUploader = ({ acceptedFileTypes, maxFileSize, token }) => {

  const [files, setFiles] = useState([])

  return (
    <div className="wrapper">
      <FilePond
        files={files}
        onupdatefiles={(fileItems) => {
          //Always called when adding or removing Files.
          setFiles(fileItems)
        }}
        allowMultiple
        server={{
          process: {
            method: 'POST',
            url: `/api/file/upload`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
            // withCredentials: true,
            // ondata: (formData) => {
            //   formData.append('extraField', 'something nice')
            //   return formData
            // },
            onload: (response) => {
              // console.log('response:', response)
              setFiles([])
              toast.success('File uploaded successfully')
            },
          },
          // revert: {
          //   url: '/api/file/remove',
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // },
        }}
        name="files"
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
      <span style={{ fontSize: '12px', color: 'grey' }}>
        <span style={{ fontSize: '10px', verticalAlign: 'super' }}>*</span>Note: If you upload a file with existing name, this file will be added postfix id
      </span>
    </div>
  )
}

ProductFileUploader.propTypes = {
  acceptedFileTypes: PropTypes.array,
  maxFileSize: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
}

export default ProductFileUploader
