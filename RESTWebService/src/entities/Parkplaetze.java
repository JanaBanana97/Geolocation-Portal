package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Parkplaetze {

	public int parkplaetzeId;
	public String oeffnungszeiten;
	public String kosten;
	public String beschreibung;
	public int oertlichkeitenId;
	public Oertlichkeiten oertlichkeit;
	
	public Parkplaetze() {
		oertlichkeit = new Oertlichkeiten();
	}
}
