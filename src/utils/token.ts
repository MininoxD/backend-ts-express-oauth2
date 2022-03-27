export const getToken = () => {
  const token:string = `${getRandomInt()}${getRandomInt()}${getRandomInt()}${getRandomInt()}`
  return token
}

function getRandomInt () {
  return Math.floor(Math.random() * (9 - 0)) + 0
}

interface SendEmail {
    to: string
    subject: string
    text? : string
    html: string
}
export const getMessage = ({ to, subject, text, html }:SendEmail) => {
  return {
    to, // Change to your recipient
    from: 'developer@sitemasdev.xyz', // Change to your verified sender
    subject,
    text,
    html
  }
}
