package main;

import ws.Benutzer;
import ws.BenutzerServiceService;
import ws.BenutzerServiceServiceLocator;
import ws.IBenutzerService;
import ws.IKategorienService;
import ws.ILokationenService;
import ws.Kategorien;
import ws.KategorienServiceService;
import ws.KategorienServiceServiceLocator;
import ws.Lokation;
import ws.LokationenServiceService;
import ws.LokationenServiceServiceLocator;

public class ClientMain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		try {
			//Kategorien			
			KategorienServiceService locaterKat = new KategorienServiceServiceLocator();
			IKategorienService serviceKat = locaterKat.getKategorienServicePort();
			
			Kategorien[] kat = serviceKat.getKategorien();
			if (kat == null) {
				System.out.println("Array ist leer");
			}
			else {
				for(Kategorien k : kat){
					System.out.println(k.getKategorienId() + ", " + k.getBezeichnung());
				}	
			}
			
			System.out.println("-------------------------------------------------------------------");
			
			//Benutzer
			BenutzerServiceService locaterBen = new BenutzerServiceServiceLocator();
			IBenutzerService serviceBen = locaterBen.getBenutzerServicePort();
			
			Benutzer[] ben = serviceBen.getAllBenutzer();
			if (ben == null) {
				System.out.println("Array ist leer");
			}
			else {
				for(Benutzer b : ben){
					System.out.println(b.getBenutzerId() + ", " + b.getVorname() + ", " + b.getNachname()
							+ ", " + b.getEmail() + ", " + b.getPasswort());
				}	
			}
			
			System.out.println("-------------------------------------------------------------------");
			
			//Lokationen
			LokationenServiceService locaterLok = new LokationenServiceServiceLocator();
			ILokationenService serviceLok = locaterLok.getLokationenServicePort();
			
			Lokation[] lok = serviceLok.getAllLokationen();
			if (lok == null) {
				System.out.println("Array ist leer");
			}
			else {
				for(Lokation l : lok){
					System.out.println(l.getLokationId() + ", " + l.getBezeichnung() + ", " + l.getLokationX()
							+ ", " + l.getLokationY() + ", " + l.getKategorienId());
				}	
			}
		}
		catch(Exception e){
			System.out.println(e.toString());
		}
		
	}

}
