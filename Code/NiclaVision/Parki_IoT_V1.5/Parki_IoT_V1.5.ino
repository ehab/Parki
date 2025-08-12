// works ... connect to Render & add 3 random values
/*
#include <WiFi.h>
#include <WiFiSSLClient.h>

const char* ssid = "Buddy";
const char* password = "ERTL_27276";

const char* host = "parki-server.onrender.com";
const int httpsPort = 443;  // HTTPS port

WiFiSSLClient sslClient;

// Generate random status
String getRandomStatus() {
  if (random(0, 2) == 0) {
    return "occupied";
  } else {
    return "empty";
  }
}

void connectWiFi() {
  Serial.print("[WiFi] Connecting to: ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\n✅ Connected to WiFi!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
}

void sendSensorData(int sensor_id, String status) {
  // JSON payload
  String jsonData = "{\"sensor_id\": " + String(sensor_id) +
                    ", \"status\": \"" + status + "\"}";

  if (!sslClient.connect(host, httpsPort)) {
    Serial.println("❌ Connection to Render server failed!");
    return;
  }

  // HTTP POST
  sslClient.println("POST /parking HTTP/1.1");
  sslClient.print("Host: ");
  sslClient.println(host);
  sslClient.println("Content-Type: application/json");
  sslClient.print("Content-Length: ");
  sslClient.println(jsonData.length());
  sslClient.println("Connection: close");
  sslClient.println();
  sslClient.println(jsonData);

  // Read response
  while (sslClient.connected()) {
    String line = sslClient.readStringUntil('\n');
    Serial.println(line);
  }

  sslClient.stop();
  Serial.println("✅ Data sent to server");
}

void setup() {
  Serial.begin(115200);
  delay(1000);
  randomSeed(analogRead(0));

  connectWiFi();
}

void loop() {
  for (int i = 1; i <= 3; i++) {
    String status = getRandomStatus();
    Serial.print("📡 Sending sensor ");
    Serial.print(i);
    Serial.print(" with status: ");
    Serial.println(status);

    sendSensorData(i, status);
    delay(1000); // short delay between sends
  }

  Serial.println("⏳ Waiting 10 seconds before next update...");
  delay(10000);
}
*/