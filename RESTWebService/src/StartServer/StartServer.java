package StartServer;
import java.io.IOException;

import com.sun.jersey.api.container.httpserver.HttpServerFactory;
import com.sun.jersey.api.core.ClasspathResourceConfig;
import com.sun.jersey.api.core.DefaultResourceConfig;
import com.sun.net.httpserver.HttpServer;


public class StartServer {		//Kommentar für Jana
	
	public static void main(String[] args) throws IllegalArgumentException, IOException {
		//Filter für CORS setzen
		DefaultResourceConfig config = new ClasspathResourceConfig();
		config.getContainerResponseFilters().add(new CORSFilter());
		
		HttpServer server = HttpServerFactory.create("http://localhost:6098/rest", config);
		server.start();
		System.out.println("Server gestartet...");
	}
}
