package entities;

public class Kategorien {

	private int kategorienId;
	private String bezeichnung;
	
	public Kategorien() {}
	
	//get
	public int getKategorienId() {
		return this.kategorienId;
	}
	public String getBezeichnung() {
		return this.bezeichnung;
	}
	
	//set
	public void setKategorienId(int id) {
		this.kategorienId = id;
	}
	public void setBezeichnung(String bezeichnung) {
		this.bezeichnung = bezeichnung;
	}
}
