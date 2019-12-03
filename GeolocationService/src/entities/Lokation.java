package entities;

public class Lokation {
	private int lokationId;
	private String bezeichnung;
	private int lokationX;
	private int lokationY;
	private int kategorienId;
	
	public Lokation() {}
	
	//get
	public int getLokationId() {
		return this.lokationId;
	}
	public String getBezeichnung() {
		return this.bezeichnung;
	}
	public int getLokationX() {
		return this.lokationX;
	}
	public int getLokationY() {
		return this.lokationY;
	}
	public int getKategorienId() {
		return this.kategorienId;
	}
	
	//set
	public void setLokationId(int id) {
		this.lokationId = id;
	}
	public void setBezeichnung(String bezeichnung) {
		this.bezeichnung = bezeichnung;
	}
	public void setLokationX(int x) {
		this.lokationX = x;
	}
	public void setLokationY(int y) {
		this.lokationY = y;
	}
	public void setKategorienId(int id) {
		this.kategorienId = id;
	}

}
