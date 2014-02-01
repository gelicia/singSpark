int speakerPin = D0;
int tempo = 300;

void playTone(int tone, int duration) {
  for (long i = 0; i < duration * 1000L; i += tone * 2) {
    digitalWrite(speakerPin, HIGH);
    delayMicroseconds(tone);
    digitalWrite(speakerPin, LOW);
    delayMicroseconds(tone);
  }
}

void playNote(char note, int duration) {
  char names[] = { 'c', 'd', 'e', 'f', 'g', 'a', 'b', 'C' };
  int tones[] = { 1915, 1700, 1519, 1432, 1275, 1136, 1014, 956 };
  
  // play the tone corresponding to the note name
  for (int i = 0; i < 8; i++) {
    if (names[i] == note) {
      playTone(tones[i], duration);
    }
  }
}

int singToMe(String args)
{
  for (int i = 0; i < args.length(); i++) {
    char oneNote = args.charAt(i);
    if (oneNote == ' ') {
      delay(tempo);
    } else {
      playNote(oneNote, tempo);
    }
  }
}

void setup() {
  pinMode(speakerPin, OUTPUT);
  Spark.function("sing", singToMe);
}

void loop() {

}