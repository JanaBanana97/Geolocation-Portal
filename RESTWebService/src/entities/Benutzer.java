package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Benutzer {
	
	public int benutzerId;
	public String vorname;
	public String nachname;
	public String email;
	public String passwort;
	
	public Benutzer() {
		
	}

}
