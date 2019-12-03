package ws;

import java.util.List;

import javax.jws.WebMethod;
import javax.jws.WebService;
import entities.Lokation;

@WebService
public interface ILokationenService {

	@WebMethod
	public List<Lokation> getAllLokationen();
}
