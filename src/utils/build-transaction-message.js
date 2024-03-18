export function buildMessageBody(amount, type) {
  let messageBody = `${type} transaction detected. The total amount is ${amount}.`;
  
  messageBody = messageBody.charAt(0).toUpperCase() + messageBody.slice(1);
  
  return messageBody;
}