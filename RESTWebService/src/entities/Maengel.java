package entities;

import java.io.InputStream;
import java.io.OutputStream;
import java.sql.Blob;

import javax.xml.bind.annotation.XmlRootElement;


@XmlRootElement
public class Maengel {

	public int maengelID;
	public String beschreibung;
	public double latitude;
	public double longitude;
	public String status;
//	public Blob bild;
//	public InputStream inputStreamBild;
//	public OutputStream outputStreamBild;
	
	public Maengel() {
		
	}
}
