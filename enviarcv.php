
<!--CONFIGURACION GENERAL-->
<?php
//RECAPTCHA
define("SITE_KEY", '6LcIyLYbAAAAABuraion0HLrDSe3_GEOLfWG6vLu');
define("SECRET_KEY", '6LcIyLYbAAAAAG53stupgSofvYJ0p0_VJ-AwQ7AN');
?>

<!--JQUERY-->
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<script>

</script>
<?php 
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require 'vendor/PHPMailer/Exception.php';
require 'vendor/PHPMailer/PHPMailer.php';
require 'vendor/PHPMailer/SMTP.php';

//Instantiation and passing `true` enables exceptions

if ($_POST['token']){

    $gtoken = $_POST['token'];
    $secret = SECRET_KEY;
    $response = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$gtoken}");
    $response = json_decode($response);
    $response = (array) $response;
    if ($response['success'] && ($response['score'] > 0.5)){
        $name = $_POST['name'];
        $email = $_POST['email'];
        $phone = $_POST['phone'];
        $msj = $_POST['message'];
        $surname = $_POST['surname'];
        $subject = $_POST['subject'];

        if($_FILES['file']['name']){
            $archivo = $_FILES['file']['name'];       
            $path = 'upload/' . $_FILES["file"]["name"];
            move_uploaded_file($_FILES["file"]["tmp_name"], $path);
        }

        $mail = new PHPMailer(true);
        $body = "<b>Este mensaje fue enviado por: </b>" . $name . $surname ."<br>".
        "<br><b>Su e-mail es: </b>" . $email . "<br>".
        "<br><b>Teléfono de contacto: </b>" . $phone . "<br>".
        "<br><b>Mensaje: </b>" . $msj . "<br>". 
        "<br><b>Enviado el: </b>" . date('d/m/Y', time()). "<br>";

        try {
            //Server settings
            $mail->SMTPDebug = false;                      //Enable verbose debug output
            $mail->isSMTP();                                            //Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   //Enable SMTP authentication
            $mail->Username   = 'webblendaec@gmail.com';                     //SMTP username
            $mail->Password   = 'AECServices-2020';                               //SMTP password
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;         //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above
        
            //Recipients
            $mail->setFrom('webblendaec@gmail.com', 'Mesagge to Blend');
            $mail->addAddress('javier_9333@hotmail.com');     //Add a recipient             //Name is optional
            //$mail->addReplyTo('info@example.com', 'Information');
            //$mail->addBCC('bcc@example.com');info@blendaec.com
        
            //Attachments
               $mail->addAttachment($path); 
             //Add attachments
            //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name
        
            //Content
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->CharSet = 'UTF-8';
            $mail->Subject = $subject;
            $mail->Body    = $body;
        
            $mail->send();
            $mail->ClearAttachments();
            header("Location:index.html"); 
            
        } catch (Exception $e) {
            echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        header("Location:index.html");
    }
}  
?>