package com.turnos_peluqueria.app_peluqueria.service;

import org.junit.jupiter.api.Test;

import java.time.LocalTime;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

// Tests unitarios puros (sin Spring ni base de datos) del cálculo de horarios y de los slugs
class AppointmentSlotsTest {

    private static LocalTime t(String s) {
        return LocalTime.parse(s);
    }

    private static List<LocalTime[]> ranges(String... pairs) {
        return java.util.stream.IntStream.range(0, pairs.length / 2)
                .mapToObj(i -> new LocalTime[] { t(pairs[2 * i]), t(pairs[2 * i + 1]) }).toList();
    }

    @Test
    void freeSlotsSkipsBusyIntervalsAndRespectsClosing() {
        // Atiende 09:00-11:00, turno ocupado 09:30-10:15
        List<LocalTime[]> busy = ranges("09:30", "10:15");

        // 45 min: 09:00 choca, 09:30 y 10:00 chocan, 10:30 no entra (termina 11:15)
        assertEquals(List.of(), AppointmentService.freeSlots(ranges("09:00", "11:00"), 45, busy, null));
        assertEquals(List.of(t("09:00"), t("10:30")), AppointmentService.freeSlots(ranges("09:00", "11:00"), 30, busy, null));
    }

    @Test
    void freeSlotsUsesEveryWorkRange() {
        // Horario partido 09-10 y 15-16: no ofrece nada al mediodía
        assertEquals(List.of(t("09:00"), t("09:30"), t("15:00"), t("15:30")),
                AppointmentService.freeSlots(ranges("09:00", "10:00", "15:00", "16:00"), 30, List.of(), null));
    }

    @Test
    void freeSlotsHidesPastTimesOfToday() {
        List<LocalTime> free = AppointmentService.freeSlots(ranges("09:00", "11:00"), 30, List.of(), t("09:40"));
        assertEquals(List.of(t("10:00"), t("10:30")), free);
    }

    @Test
    void freeSlotsDoesNotLoopPastMidnight() {
        assertEquals(List.of(t("23:00")), AppointmentService.freeSlots(ranges("23:00", "23:59"), 30, List.of(), null));
    }

    @Test
    void wholeDayBlockLeavesNoSlots() {
        List<LocalTime[]> feriado = List.<LocalTime[]>of(new LocalTime[] { LocalTime.MIN, LocalTime.MAX });
        assertEquals(List.of(), AppointmentService.freeSlots(ranges("09:00", "20:00"), 30, feriado, null));
    }

    @Test
    void overlapsTreatsTouchingIntervalsAsFree() {
        List<LocalTime[]> busy = ranges("10:00", "10:30");
        assertFalse(AppointmentService.overlaps(busy, t("10:30"), t("11:00")));
        assertFalse(AppointmentService.overlaps(busy, t("09:30"), t("10:00")));
        assertTrue(AppointmentService.overlaps(busy, t("10:15"), t("10:45")));
    }

    @Test
    void fitsInRangesNeedsTheWholeServiceInsideOneRange() {
        List<LocalTime[]> work = ranges("09:00", "13:00", "15:00", "20:00");
        assertTrue(AppointmentService.fitsInRanges(work, t("12:00"), t("13:00")));
        assertFalse(AppointmentService.fitsInRanges(work, t("12:30"), t("13:30")));
        assertFalse(AppointmentService.fitsInRanges(work, t("14:00"), t("14:30")));
    }

    @Test
    void clipCutsEmployeeRangesToBusinessHours() {
        List<LocalTime[]> clipped = ScheduleService.clip(ranges("08:00", "10:00", "21:00", "22:00"), t("09:00"), t("20:00"));
        assertEquals(1, clipped.size());
        assertArrayEquals(new LocalTime[] { t("09:00"), t("10:00") }, clipped.get(0));
    }

    @Test
    void slugsAreUrlSafeAndReservedOnesAreRejected() {
        assertEquals("peluqueria-nandu-2", Slugs.toSlug("  Peluquería Ñandú #2 "));
        assertDoesNotThrow(() -> Slugs.validate("mi-pelu"));
        assertThrows(IllegalArgumentException.class, () -> Slugs.validate("Mi Pelu"));
        assertThrows(IllegalArgumentException.class, () -> Slugs.validate("login"));
    }
}
