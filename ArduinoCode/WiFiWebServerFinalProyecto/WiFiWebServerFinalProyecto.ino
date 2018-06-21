/*
 *  This sketch demonstrates how to set up a simple HTTP-like server.
 *  The server will set a GPIO pin depending on the request
 *    http://server_ip/gpio/0 will set the GPIO2 low,
 *    http://server_ip/gpio/1 will set the GPIO2 high
 *  server_ip is the IP address of the ESP8266 module, will be
 *  printed to Serial when the module is connected.
 */

#include <ESP8266WiFi.h>
/*
 * This is the credentials for connect to the Router
*/
const char* ssid = "jairgerson";
const char* password = "gerson86jair";
//const char* ssid = "Vodafone-33958722";
//const char* password = "Eleazar*Gerson*Patricia";

/*
 * Here define the IP, Gateway and Subnet
*/
IPAddress ip(192,168,43,252);
IPAddress gateway(192,168,43,1);
//IPAddress ip(192,168,1,252);
//IPAddress gateway(192,168,1,1);
IPAddress subnet(255,255,255,0);

/*
 * Create an instance of the server
 * specify the port to listen on as an argument
*/
WiFiServer server(80);
int val=0;

int switchPin=0;//1 set pin (HIGH/LOW), 2 get pin(get the state of the PIN)
///////////////////////////////////////gj//////////////////////////////////////////////////
/*
 * led: Is the led and first switch
 * button: Is the manual switch on/off
 * estado: is the state of the led
 * estadoAnterior: Is the state before, this is for only click once time with the button
 * salida: Is for Control the state of the led.
*/
int led =4;
int button=12;
int estado=0;
int estadoAnterior=0;
int salida=0;
////////////////////////////////////////gj////////////////////////////////////////////////

  void setup() {
    Serial.begin(115200);
    delay(10);
    PrepareVariables();
    ConnectNetwork();

    // Start the server
    server.begin();
    Serial.println("Server started");

    // Print the IP address
    Serial.println(WiFi.localIP());
  }
  /*
   * This method is for Prepare the variables
  */
  void PrepareVariables()
  {
    // prepare GPIO2
    pinMode(led,OUTPUT);
    pinMode(button,INPUT);
    digitalWrite(led, LOW);
  }
  void ConnectNetwork()
  {
    // Connect to WiFi network
    Serial.println();
    Serial.println();
    Serial.print("Connecting to ");
    Serial.println(ssid);

    WiFi.begin(ssid, password);
    WiFi.config(ip,gateway,subnet);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi connected");

  }


void loop() {

  // Check if a client has connected
  WiFiClient client = server.available();
  if (!client) {
    return;
  }

  // Wait until the client sends some data
  Serial.println("new client");
  while(!client.available()){
    delay(1);
  }

  // Read the first line of the request
  String req = client.readStringUntil('\r');
  Serial.println(req);
  client.flush();

  // Match the request

  if (req.indexOf("/gpio/1") != -1)
  {
      salida = 1;
      switchPin=1;
  }
  else if (req.indexOf("/gpio/0") != -1)
    {
      salida = 0;
      switchPin=1;
     }
  else if(req.indexOf("/gpior/1") != -1)
        {
          switchPin=2;
         }
  else {
    Serial.println("invalid request");
    client.stop();
    return;
  }

  // Set GPIO2 according to the request
  digitalWrite(led, salida);
  client.flush();

  // Prepare the response
  String s="";
  if(switchPin==1)
  {
    s = "HTTP/1.1 200 OK\r\nContent-Type: application/json;charset=utf-8\r\nHost:192.168.1.9\r\nAccess-Control-Allow-Origin:*\r\nAccess-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept\r\n\r\n";
    s += (salida)?"{\"pin1\":1}":"{\"pin1\":0}";
    }
  else
  if(switchPin==2)
  {
    s = "HTTP/1.1 200 OK\r\nContent-Type: application/json;charset=utf-8\r\nHost:192.168.1.9\r\nAccess-Control-Allow-Origin:*\r\nAccess-Control-Allow-Headers:Origin, X-Requested-With, Content-Type, Accept\r\n\r\n";
    s += (salida)?"{\"pin1\":true}":"{\"pin1\":false}";
    }
  // Send the response to the client
  client.print(s);
  delay(1);
  Serial.println("Client disonnected");

  // The client will actually be disconnected
  // when the function returns and 'client' object is detroyed
}

