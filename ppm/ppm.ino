#include <TimerOne.h>
#define PULSE 300

int channels[6] = {1200,1200,1200,1200,1200,1200};
char chr[10];
char cc;
String this_line;
void setup(void){
  pinMode(10, OUTPUT);
  digitalWrite(10, HIGH);
  Timer1.initialize(18000);
  Timer1.attachInterrupt(relay);
  Serial.begin(57600);
  delay(1000);
  Serial.println("I'm on!");
}

void pulse() {
  digitalWrite(10, LOW);
  delayMicroseconds(PULSE);
  digitalWrite(10,HIGH);
}

void channel(int delay) {
  pulse();  
  delayMicroseconds(delay);
}

void loop(void){
  readBuf();
}

void relay(void){
  for(int i=0; i<6; i++){
    channel(channels[i]);
  }
}
void upArray(String upStr){
  int index=atoi(upStr.substring(0,1).c_str());
  int val=atoi(upStr.substring(1).c_str());
  if(val>=0 && val<1000)
    channels[index]=700+val;
}

void readBuf(){
  if (Serial.available()) {
    uint8_t cnum = 0;
    do
    {
      while (Serial.available() == 0 ); // wait for a char this causes the blocking
      cc = Serial.read();
      chr[cnum++] = cc;
    }
    while (cc != '\n' && cc != '\r');
    chr[cnum-1] = 0;
    this_line = chr;
    if (strlen(this_line.c_str())==4)
      upArray(this_line);
    Serial.println(this_line);
    Serial.println(channels[atoi(this_line.substring(0,1).c_str())]);
  }
}
