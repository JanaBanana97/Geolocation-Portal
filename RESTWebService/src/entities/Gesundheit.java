package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Gesundheit {

	public int gesundheitId;
	public String typ;
	public String beschreibung;
	public int oertlichkeitenId;
	public Oertlichkeiten oertlichkeit;

	public Gesundheit() {
		oertlichkeit = new Oertlichkeiten();
	}
}
