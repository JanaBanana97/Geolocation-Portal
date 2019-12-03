package main;

import javax.xml.ws.Endpoint;

import ws.BenutzerService;
import ws.KategorienService;
import ws.LokationenService;

public class PublishMain {

	public static void main(String[] args) {
		// TODO Auto-generated method stub

		try {
			Endpoint.publish("http://localhost:4791/ws/KategorienService", new KategorienService());
			Endpoint.publish("http://localhost:4791/ws/BenutzerService", new BenutzerService());
			Endpoint.publish("http://localhost:4791/ws/LokationenService", new LokationenService());
			System.out.println("Server laufen...");
		}
		catch(Exception e){
			System.out.println("Fehler: " + e.toString());
		}
	}

}
