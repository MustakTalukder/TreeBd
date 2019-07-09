
const generateTemplate = (info) => {
    return (
        `
            <strong>Hello ${info.name},</strong>
            <br>
            <p>Thank you for activating your account.</p>
            <br>
            <a href=${info.link} >Explore</a>
            <br>
            <br>
         
        `
    )
} 

module.exports = generateTemplate