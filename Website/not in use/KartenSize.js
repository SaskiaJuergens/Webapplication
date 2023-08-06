// Event Listener, um die Bildgröße vor dem Hochladen zu überprüfen
document.getElementById('bild').addEventListener('change', checkFileSize);
document.getElementById('artist').addEventListener('change', checkFileSize);

function checkFileSize(event) {
  const input = event.target;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const fileSize = file.size; // Dateigröße in Bytes

    // Konvertieren in Kilobytes (KB)
    const fileSizeInKB = fileSize / 1024;

    // Überprüfung, ob die Dateigröße kleiner als 100KB ist
    if (fileSizeInKB > 100) {
      alert("Bild muss kleiner als 100KB sein");
      input.value = ""; // Leeren Sie den Datei-Upload, um den Benutzer zum erneuten Auswählen aufzufordern.
    }
  }
}
