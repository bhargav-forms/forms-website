<?php
include "db.php";
session_start();

$email = $_POST['email'];
$otp = $_POST['otp'];

$sql = "SELECT * FROM users WHERE email='$email' AND otp='$otp'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Mark user as verified
    $conn->query("UPDATE users SET verified=1 WHERE email='$email'");
    echo "OTP verified successfully!";
} else {
    echo "Invalid OTP. Please try again.";
}
?>