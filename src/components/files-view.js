import React, { Component } from 'react';
import FileDownload from "../../node_modules/js-file-download";
import * as axios from '../../node_modules/axios';

class FilesView extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    download = (fileName) => {
        this.props.storage.ref().child(fileName).getDownloadURL().then(function (url) {
            var xhr = new XMLHttpRequest();
            xhr.responseType = 'blob';
            xhr.onload = function(event) {
              var blob = xhr.response;
            };
            xhr.open('GET', url);
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");
            xhr.setRequestHeader("Access-Control-Allow-Credentials", "true");
            xhr.setRequestHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            xhr.setRequestHeader("Access-Control-Max-Age", "3600");
            xhr.setRequestHeader("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-With, remember-me");
            xhr.send();
            
        })
    }
    render() {
        const files = this.props.files;
        const self = this;
        return (
            <div>
                {
                    files.length > 0 &&
                    <div><h5>Files:</h5>
                        <div className="table-responsive">
                            <table className="table table-striped table-dark">
                                <thead>
                                    <tr>
                                        <th scope="col">Name</th>
                                        <th scope="col">Link</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map(function (item) {
                                        return <tr key={item + "1"}>
                                            <th key={item + "2"} scope="row">{item}</th>
                                            <td key={item.titlu + "3"}>
                                                <button onClick={() => self.download(item)} className="btn btn-xs btn-primary">Download</button>
                                            </td>
                                        </tr>
                                    })}

                                </tbody>
                            </table></div></div>
                }

            </div>
        )
    }
}

export default FilesView;