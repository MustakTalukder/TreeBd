

const generateTemplate = (info) => {
    return (
        `
            <strong><h2>TreeBD</h2></strong> 
            <strong>Hello ${info.name},</strong>
            <br>
            <p>Thank you for your interest in our site. 
            we have receive your registration request. 
            Here is your link to verify. 
            please click the link below or copy paste the link to your favourite Browser</p>
            <br>
            <a href=${info.link} >Verify</a>
            <br>
            <p>Or Copy paste the link</p>
            <br>
            <p>${info.link}</p>
        `
    )
} 

module.exports = generateTemplate