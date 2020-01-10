package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Maengel {

	public int maengelID;
	public String beschreibung;
	public double latitude;
	public double longitude;
	public String status;
	
	public Maengel() {
		
	}
}
