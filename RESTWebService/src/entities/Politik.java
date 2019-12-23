package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Politik {

	public int politikId;
	public String typ;
	public String beschreibung;
	public int oertlichkeitenId;
	public Oertlichkeiten oertlichkeit;
	
	public Politik() {
		oertlichkeit = new Oertlichkeiten();
	}
}
