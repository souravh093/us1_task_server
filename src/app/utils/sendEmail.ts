import nodemailer from 'nodemailer';

export const sendEmail = async (link: string, email: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'souravofficial.web@gmail.com',
      pass: 'nvkk qpux gzte nmjp',
    },
  });

  // send mail
  await transporter.sendMail({
    from: 'souravofficial.web@gmail.com',
    to: `${email}`,
    subject: 'Reset you password within 1 hour',
    text: 'Click the Link below to reset your password',
    html: link,
  });
};

export const sendEmailToAdmin = async (
  email: string,
  name: string,
  message: string,
) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'souravofficial.web@gmail.com',
      pass: 'nvkk qpux gzte nmjp',
    },
  });

  // send mail

  await transporter.sendMail({
    from: `${email}`,
    to: 'souravofficial.web@gmail.com',
    subject: `Contact me from my website by ${name}`,
    text: message,
    html: `<p>${message}</p>`,
  });
};
