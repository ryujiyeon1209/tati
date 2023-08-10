package com.ssafy.tati.entity;

import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@Getter @Setter
@EqualsAndHashCode(of = "studyMemberId")
@NoArgsConstructor
@AllArgsConstructor
public class StudyMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer studyMemberId;

    @Column(name = "study_join_date", nullable = false)
    private LocalDate studyJoinDate;

    @Column(name="study_member_penalty")
    @ColumnDefault("0")
    private Integer studyMemberPenalty;

    @Column(name="absence_count")
    @ColumnDefault("0")
    private Integer absenceCount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "study_id")
    private Study study;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    public StudyMember(LocalDate currentDate, Study study, Member member) {
        this.studyJoinDate = currentDate;
        setMember(member);
        setStudy(study);
    }

    private void setMember(Member member){
        this.member=member;
        if(member!=null){
            member.getStudyList().add(this);
        }
    }

    private void setStudy(Study study){
        this.study=study;
        if(study!=null){
            study.getStudyMemberList().add(this);
        }
    }

    public void deleteStudyMember() {
        this.study = null;
        this.member = null;
    }
}