import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuid4 } from 'uuid';
import { CreateNoteDto } from './dto/create-note.dto';
import { UpdateNoteDto } from './dto/update-note.dto';
import noteStorage from './noteStorage';

@Injectable()
export class NotesService {
  create(createNoteDto: CreateNoteDto) {
    const note = {
      id: uuid4(),
      date: new Date().toLocaleDateString('en', { year: 'numeric', month: 'numeric', day: 'numeric' }),
      ...createNoteDto,
    };
    noteStorage.push(note);
    return note;
  }

  findAll() {
    return noteStorage;
  }

  findOne(id: string) {
    if (noteStorage.findIndex(item => item.id === id) === -1) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return noteStorage.find(item => item.id === id);
  }

  update(id: string, updateNoteDto: UpdateNoteDto) {
    const noteIndex = noteStorage.findIndex(item => item.id === id);
    if (noteIndex === -1) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    const note = {
      ...noteStorage[noteIndex],
      ...updateNoteDto,
    };

    noteStorage[noteIndex] = note;
    
    return note;
  }

  remove(id: string) {
    const noteIndex = noteStorage.findIndex(item => item.id === id);
    if (noteIndex === -1) {
      throw new HttpException('Note not found', HttpStatus.NOT_FOUND);
    }

    return noteStorage.splice(noteIndex, 1)[0];
  }

  stats() {
    const stats = noteStorage.reduce((acc, {category}) => {
      acc[category] = acc[category] || {category, count: 0};
      acc[category].count++;
      return acc;
    }, Object.create(null));

    return Object.values(stats);
  }
}
