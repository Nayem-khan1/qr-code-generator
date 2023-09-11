import QRCode from 'qrcode'
import { useState } from 'react'

function Qrcode() {
	const [productName, setProductName] = useState('')
	const [qr, setQr] = useState('')

	const GenerateQRCode = () => {
		QRCode.toDataURL(productName, {
			width: 300,
			margin: 2,
			color: {
				dark: '#335383FF',
				light: '#EEEEEEFF'
			}
		}, (err, productName) => {
			if (err) return console.error(err)

			console.log(productName)
			setQr(productName)
		})
	}

	return (
		<div className="app">
			<h1>QR Generator</h1>
			<input 
				type="text"
				placeholder="Product Name"
				value={productName}
				onChange={e => setProductName(e.target.value)} />
			<button onClick={GenerateQRCode}>Generate</button>
			{qr && <>
				<img src={qr} />
				<a href={qr} download="qrcode.png">Download</a>
			</>}
		</div>
	)
}

export default Qrcode;
