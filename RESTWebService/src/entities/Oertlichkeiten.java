package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Oertlichkeiten {

	public int oertlichkeitenId;
	public String bezeichnung;
	public double longitude;
	public double latitude;
	public String strasse;
	public String hausnummer;
	public int postleitzahl;
	public String ort;
	public int kategorienId;
	
	public Oertlichkeiten() {
		
	}
	
}
