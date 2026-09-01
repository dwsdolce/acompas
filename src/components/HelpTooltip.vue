<script setup lang="ts">
import { ref, useId } from 'vue'
import { useI18n } from 'vue-i18n'

/**
 * The "?" beside a control, and the explanation it reveals.
 *
 * A "?" is a click target on every platform this app runs on. Apple documents a
 * circular help button whose behaviour is to open help content when clicked,
 * and reserves hover text ("help tags") for describing other controls; iOS has
 * no hover at all, so a hover-only affordance is simply unreachable with a
 * finger. On the web, WCAG 1.4.13 requires content revealed by hover to be
 * dismissable, persistent, and reachable by the pointer.
 *
 * So it opens on click, on every platform, and on no other gesture. Hover is
 * not kept as an extra: that would mean the same "?" behaving one way under a
 * finger and another under a mouse, which is the inconsistency this set out to
 * remove - and it made a click on an already-hovered caption close the thing
 * you were reading.
 *
 * QMenu rather than QTooltip: a tooltip is rendered with `no-pointer-events`,
 * which means you can never move onto it to read it — the "hoverable" half of
 * 1.4.13 — and it closes when its anchor loses focus, so any forced blur()
 * elsewhere in the page dismisses it. A menu is pointer-interactive, closes on
 * an outside click and on Escape, and declares no ARIA role of its own, which
 * leaves the description semantics to us.
 */
const props = withDefaults(defineProps<{
  text: string
  anchor?: string
  self?: string
  offset?: number[]
}>(), {
  anchor: 'top middle',
  self: 'bottom middle',
  offset: () => [8, 8]
})

const { t } = useI18n()

const shown = ref(false)
const captionId = `help-${useId()}`

const toggle = () => { shown.value = !shown.value }

// Reached by an outside click or Escape, both of which QMenu handles for us.
const onHide = () => { shown.value = false }
</script>

<template lang="pug">
q-btn.help-btn(
  dense,
  round,
  flat,
  size="10px",
  icon="mdi-help-circle",
  :aria-label="t('help')",
  :aria-expanded="shown",
  :aria-describedby="shown ? captionId : undefined",
  @click="toggle"
)
  q-menu.help-menu(
    v-model="shown",
    no-parent-event,
    :anchor="props.anchor",
    :self="props.self",
    :offset="props.offset",
    @hide="onHide"
  )
    p.text-body2.q-ma-none(:id="captionId") {{ props.text }}
</template>

<style lang="scss">
// Unscoped: the menu is rendered in a portal, outside this component's tree,
// so a scoped rule would never reach it. The .help-btn target size is global,
// in app.sass, because the other help buttons use it on pages this component
// never loads on.

// Styled to read as the tooltip it replaces rather than as a menu.
.help-menu {
  max-width: 260px;
  padding: 8px 12px;
  background: rgba(0, 0, 0, 0.9);
  color: #fff;
  border-radius: 4px;
}
</style>
