package ws;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;

import entities.Benutzer;

@WebService
public interface IBenutzerService {
	
	@WebMethod
	public List<Benutzer> getAllBenutzer();
	
}
