

const generateTemplate = (info) => {
    return (
        `
            <strong>Hello ${info.name},</strong>
            <br>
            <p>Here is your reset link</p>
            <br>
            <a href=${info.link} >Reset</a>
            <br>
            <p>Or Copy paste the link</p>
            <br>
            <p>${info.link}</p>
        `
    )
} 

module.exports = generateTemplate