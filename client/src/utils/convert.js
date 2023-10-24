//* image onto base64
 function convertToBase64 (File) {
    return new Promise((resolve, reject) => {
        const fileReader = new FileReader()
        fileReader.readAsDataURL(File)
        fileReader.onload = () => {
            resolve(fileReader.result)
        }

        fileReader.onerror = (err) => {
            reject(err)
        }
    })
}



export  {convertToBase64 }

 






