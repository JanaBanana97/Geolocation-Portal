package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Maengel {

	public int maengelID;
	public String beschreibung;
	public String latitude;
	public String longitude;
	public String status;
	
	public Maengel() {
		
	}
}
