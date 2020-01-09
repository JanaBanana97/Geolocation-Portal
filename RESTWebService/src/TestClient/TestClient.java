package TestClient;

import java.util.List;

import javax.ws.rs.core.MediaType;

import com.sun.jersey.api.client.Client;
import com.sun.jersey.api.client.ClientResponse;
import com.sun.jersey.api.client.GenericType;
import com.sun.jersey.api.client.WebResource;
import com.sun.jersey.api.client.WebResource.Builder;
import com.sun.jersey.api.client.config.ClientConfig;
import com.sun.jersey.api.client.config.DefaultClientConfig;

import entities.Kategorien;

public class TestClient {
	public static void main(String[] args) {
		ClientConfig clientConfig = new DefaultClientConfig();
		
		Client client = Client.create(clientConfig);
		
		WebResource webResource = client.resource("http://localhost:6098/rest/KategorienService/getAllKategorien");
		 
	      Builder builder = webResource.accept(MediaType.APPLICATION_JSON) //
	              .header("content-type", MediaType.APPLICATION_JSON);
	 
	      ClientResponse response = builder.get(ClientResponse.class);
	 
	      // Status 200 is successful.
	      if (response.getStatus() != 200) {
	          System.out.println("Failed with HTTP Error code: " + response.getStatus());
	         String error = response.getEntity(String.class);
	         System.out.println("Error: "+error);
	          return;
	      }
	 
	      GenericType<List<Kategorien>> generic = new GenericType<List<Kategorien>>() {
	          // No thing
	      };
	 
	      List<Kategorien> list = response.getEntity(generic);
	 
	      System.out.println("Output from Server .... \n");
	 
	      for (Kategorien emp : list) {
	          System.out.println(" --- ");
	          System.out.println("KatNr .... " + emp.kategorienId);
	          System.out.println("KatBez .... " + emp.bezeichnung);
	      }
	}
}
