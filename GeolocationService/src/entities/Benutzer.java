package entities;

public class Benutzer {

	private int benutzerId;
	private String vorname;
	private String nachname;
	private String email;
	private String passwort;
	
	public Benutzer() {}
	
	//get
	public int getBenutzerId() {
		return this.benutzerId;
	}
	public String getVorname() {
		return this.vorname;
	}
	public String getNachname() {
		return this.nachname;
	}
	public String getEmail() {
		return this.email;
	}
	public String getPasswort() {
		return this.passwort;
	}
	
	//set
	public void setBenutzerId(int id) {
		this.benutzerId = id;
	}
	public void setVorname(String vorname) {
		this.vorname = vorname;
	}
	public void setNachname(String nachname) {
		this.nachname = nachname;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public void setPasswort(String passwort) {
		this.passwort = passwort;
	}
}
