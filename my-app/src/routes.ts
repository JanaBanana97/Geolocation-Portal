import { Routes } from "@angular/router"
import { MapComponent } from "./app/map/map.component"

export const appRoutes: Routes = [
  { path: "run/:id", component: MapComponent },
  { path: "", redirectTo: "/runs", pathMatch: 'full' }
]
