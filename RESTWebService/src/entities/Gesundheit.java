package entities;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Gesundheit {

	public int gesundheitsId;
	public String typ;
	public String beschreibung;
	public int oertlichkeitenId;

	public Gesundheit() {
		
	}
}
