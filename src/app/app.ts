import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from './components/navbar/navbar';
import { Footer } from './components/footer/footer';
import { CompareBar } from './components/compare-bar/compare-bar';

@Component({
  imports: [RouterOutlet, Navbar, Footer, CompareBar],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}