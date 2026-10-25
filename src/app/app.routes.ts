import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Collection } from './pages/collection/collection';
import { CarDetail } from './pages/car-detail/car-detail';
import { Contact } from './pages/contact/contact';
import { Favorites } from './pages/favorites/favorites';
import { Compare } from './pages/compare/compare';
import { Booking } from './pages/booking/booking';

export const routes: Routes = [
  { path: '', component: Home, title: 'Maison Rania' },
  { path: 'collection', component: Collection, title: 'Collection · Maison Rania' },
  { path: 'car/:id', component: CarDetail, title: 'Car details · Maison Rania' },
  { path: 'favorites', component: Favorites, title: 'My favorites · Maison Rania' },
  { path: 'compare', component: Compare, title: 'Compare · Maison Rania' },
  { path: 'book', component: Booking, title: 'Book your visit · Maison Rania' },
  { path: 'contact', component: Contact, title: 'Contact · Maison Rania' },
  { path: '**', redirectTo: '' },
];