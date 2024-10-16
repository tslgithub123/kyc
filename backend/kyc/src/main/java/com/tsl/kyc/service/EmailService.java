package com.tsl.kyc.service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.stereotype.Service;

import java.io.File;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String to, String subject, String body) throws MessagingException {
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        helper.setFrom("yelwandedhananjay@gmail.com");
        helper.setTo(to);
        helper.setSubject(subject);

        String htmlMsg = "<html><body>" + body + "<br><br>" +
                "<img src='cid:signatureImage'><br>" +
                "Best regards,<br>Your Company</body></html>";
        helper.setText(htmlMsg, true);

        // Add the inline image
        //FileSystemResource res = new FileSystemResource(new File("path/to/signature.png"));
//        helper.addInline("signatureImage", res);
        // Add the inline image from a URL


        mailSender.send(message);
    }
}
