<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'src/Exception.php';
require 'src/PHPMailer.php';
require 'src/SMTP.php';
include "db.php";

session_start();

$email = $_POST['email'];
$username = $_POST['username'];
$otp = rand(100000, 999999);

// Save OTP to DB
$sql = "INSERT INTO users (username, email, otp)
        VALUES ('$username', '$email', '$otp')
        ON DUPLICATE KEY UPDATE otp='$otp', verified=0";
$conn->query($sql);

// Send Email
$mail = new PHPMailer(true);
try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;

    // ✅ Update these:
    $mail->Username = 'thalluribhargav2002@gmail.com';        // Your Gmail address
    $mail->Password = 'pbzr iwzt mauc eipb';          // Your 16-character App Password

    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $mail->setFrom('yourgmail@gmail.com', 'OTP Service'); // Optional Name
    $mail->addAddress($email);
    $mail->Subject = 'Your OTP Code';
    $mail->Body    = "Hi $username,\n\nYour OTP is: $otp";

    $mail->send();
    echo "OTP sent to your email.";
} catch (Exception $e) {
    echo "Failed to send OTP. Error: {$mail->ErrorInfo}";
}
?>