<?php
session_start();
include "db.php";

// Get form inputs
$username = $_POST['login_username'];
$email = $_POST['login_email'];

// Check if user exists and is verified
$sql = "SELECT * FROM users WHERE username='$username' AND email='$email' AND verified=1";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // Set session and redirect to dashboard
    $_SESSION['user'] = $username;
    header("Location: dashboard.html");
    exit();
} else {
    echo "<script>alert('Invalid credentials or email not verified. Please register and verify first.'); window.location.href='index.html';</script>";
}
?>