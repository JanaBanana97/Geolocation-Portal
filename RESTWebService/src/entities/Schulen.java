package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Schulen {

	public int schulenId;
	public String typ;
	public String beschreibung;
	public int oertlichkeitenId;
	public Oertlichkeiten oertlichkeit;
	
	public Schulen() {
		oertlichkeit = new Oertlichkeiten();
	}
}
